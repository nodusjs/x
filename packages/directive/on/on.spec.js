import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { connectArc } from "./interface";
import On from "./on";

describe("<x-on> directive (unit)", () => {
  let host;
  let parent;

  beforeEach(() => {
    vi.spyOn(customElements, "whenDefined").mockResolvedValue();

    parent = {
      localName: "x-button",
      [connectArc]: vi.fn(),
    };

    host = new On();

    Object.defineProperty(host, "parentElement", {
      value: parent,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("setter value() deve chamar disconnectArc antes e connectArc depois no connectedCallback", async () => {
    host.value = "foo";
    host.connectedCallback();
    await Promise.resolve();
    expect(parent[connectArc]).toHaveBeenCalledWith("foo");
  });
});
