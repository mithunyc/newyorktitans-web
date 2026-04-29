import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock server-only to prevent issues in vitest environment if it complains
vi.mock("server-only", () => ({}));

// Mock Resend constructor and send
const mockSend = vi.fn();
vi.mock("resend", () => {
  return {
    Resend: vi.fn().mockImplementation(() => ({
      emails: {
        send: mockSend,
      },
    })),
  };
});

describe("email module", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    mockSend.mockReset();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("does not throw on import when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;
    // Dynamic import to test module loading
    const emailModule = await import("../lib/email");
    expect(emailModule).toBeDefined();
  });

  it("sending sponsor inquiry without RESEND_API_KEY returns { ok: false, reason: 'send_failed' }", async () => {
    delete process.env.RESEND_API_KEY;
    const { sendSponsorInquiry } = await import("../lib/email");
    const result = await sendSponsorInquiry({
      name: "Test",
      organization: "Org",
      email: "test@example.com",
      message: "Hello",
    });
    expect(result).toEqual({
      ok: false,
      reason: "send_failed",
      details: "Missing required env var: RESEND_API_KEY. See .env.example.",
    });
  });

  it("sending general interest without RESEND_API_KEY returns { ok: false, reason: 'send_failed' }", async () => {
    delete process.env.RESEND_API_KEY;
    const { sendGeneralInterest } = await import("../lib/email");
    const result = await sendGeneralInterest({
      name: "Test",
      category: "General",
      email: "test@example.com",
      message: "Hello",
    });
    expect(result).toEqual({
      ok: false,
      reason: "send_failed",
      details: "Missing required env var: RESEND_API_KEY. See .env.example.",
    });
  });

  it("sends both inquiry and auto-responder when RESEND_API_KEY exists", async () => {
    process.env.RESEND_API_KEY = "re_test_123";
    const { sendSponsorInquiry } = await import("../lib/email");

    mockSend.mockResolvedValueOnce({ id: "1" }).mockResolvedValueOnce({ id: "2" });

    const result = await sendSponsorInquiry({
      name: "Test Sponsor",
      organization: "Test Org",
      email: "sponsor@example.com",
      message: "Let's partner",
    });

    expect(result).toEqual({ ok: true });
    expect(mockSend).toHaveBeenCalledTimes(2);

    // 1. Inquiry to operator
    expect(mockSend.mock.calls[0]![0]).toMatchObject({
      to: "partnerships@newyorktitans.org",
      replyTo: "sponsor@example.com",
      subject: "Sponsor inquiry — Test Org",
    });

    // 2. Auto-responder to submitter
    expect(mockSend.mock.calls[1]![0]).toMatchObject({
      to: "sponsor@example.com",
      replyTo: "partnerships@newyorktitans.org",
    });
  });

  it("sends both general inquiry and auto-responder when RESEND_API_KEY exists", async () => {
    process.env.RESEND_API_KEY = "re_test_123";
    const { sendGeneralInterest } = await import("../lib/email");

    mockSend.mockResolvedValueOnce({ id: "1" }).mockResolvedValueOnce({ id: "2" });

    const result = await sendGeneralInterest({
      name: "Test Player",
      category: "Player",
      email: "player@example.com",
      message: "I want to play",
    });

    expect(result).toEqual({ ok: true });
    expect(mockSend).toHaveBeenCalledTimes(2);

    // 1. Inquiry to operator
    expect(mockSend.mock.calls[0]![0]).toMatchObject({
      to: "inquiries@newyorktitans.org",
      replyTo: "player@example.com",
    });

    // 2. Auto-responder to submitter
    expect(mockSend.mock.calls[1]![0]).toMatchObject({
      to: "player@example.com",
      replyTo: "inquiries@newyorktitans.org",
    });
  });
});
