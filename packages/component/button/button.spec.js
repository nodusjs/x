import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import Button from "./button";

vi.mock("@nodusjs/std/event", () => ({
  default: { click: () => () => {} },
}));

describe("Button", () => {
  let button;

  const mockInternals = {
    states: {
      add: vi.fn(),
      delete: vi.fn(),
    },
    form: {
      reset: vi.fn(),
      requestSubmit: vi.fn(),
    },
  };

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "attachInternals", {
      value: () => mockInternals,
    });
  });

  beforeEach(() => {
    button = new Button();
    mockInternals.states.add.mockClear();
    mockInternals.states.delete.mockClear();
    mockInternals.form.reset.mockClear();
    mockInternals.form.requestSubmit.mockClear();
  });

  it('deve ter color padrão "brand"', () => {
    expect(button.color).toBe("brand");
  });

  it("deve atualizar color corretamente", () => {
    button.color = "error";
    expect(button.color).toBe("error");
  });

  it("deve ter onlyIcon padrão false", () => {
    expect(button.onlyIcon).toBe(false);
  });

  it("deve atualizar onlyIcon corretamente", () => {
    button.onlyIcon = true;
    expect(button.onlyIcon).toBe(true);
  });

  it('deve ter size padrão "md"', () => {
    expect(button.size).toBe("md");
  });

  it("deve atualizar size corretamente", () => {
    button.size = "lg";
    expect(button.size).toBe("lg");
  });

  it('deve ter type padrão "submit"', () => {
    expect(button.type).toBe("submit");
  });

  it("deve atualizar type corretamente", () => {
    button.type = "reset";
    expect(button.type).toBe("reset");
  });

  it("deve ter value padrão undefined", () => {
    expect(button.value).toBeUndefined();
  });

  it("deve atualizar value corretamente", () => {
    button.value = "foo";
    expect(button.value).toBe("foo");
  });

  it('deve ter variant padrão "solid"', () => {
    expect(button.variant).toBe("solid");
  });

  it("deve atualizar variant corretamente", () => {
    button.variant = "ghost";
    expect(button.variant).toBe("ghost");
  });

  it("deve atualizar width corretamente", () => {
    button.width = "fill";
    expect(button.width).toBe("fill");
  });

  it("deve retornar true em formAssociated", () => {
    expect(Button.formAssociated).toBe(true);
  });

  it("click() deve retornar a própria instância", () => {
    expect(button.click()).toBe(button);
  });

  it('click() com type="submit" deve chamar requestSubmit e não reset', async () => {
    button.type = "submit";
    button.click();

    await new Promise((r) => setTimeout(r, 100));

    expect(mockInternals.form.requestSubmit).toHaveBeenCalled();
    expect(mockInternals.form.reset).not.toHaveBeenCalled();
  });

  it('click() com type="reset" deve chamar reset e não requestSubmit', async () => {
    button.type = "reset";
    button.click();

    await new Promise((r) => setTimeout(r, 100));

    expect(mockInternals.form.reset).toHaveBeenCalled();
    expect(mockInternals.form.requestSubmit).not.toHaveBeenCalled();
  });
});
