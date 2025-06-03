import { interpolate } from "@directive/render/interpolate";
import { emitter, hideble } from "@interface";
import { after, before } from "@middleware";
import { attributeChanged, connected, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import http from "./http";

@define("x-fetch")
class Fetch extends Echo(HTMLElement) {
  #controller;
  #url;

  get controller() {
    return (this.#controller ??= new AbortController());
  }

  get url() {
    return (this.#url ??= "");
  }

  @attributeChanged("url")
  set url(value) {
    this.#url = value;
  }

  abort(payload) {
    this.controller.abort();
    this.#controller = new AbortController();
    return payload;
  }

  @before("abort")
  @after(emitter)
  delete(payload) {
    return http
      .delete(interpolate(this.url, payload))
      .signal(this.controller.signal)
      .json();
  }

  async [emitter](response) {
    const { data, error } = await response;
    error
      ? this.dispatchEvent(new CustomEvent("error", { detail: data }))
      : this.dispatchEvent(new CustomEvent("ok", { detail: data }));
    return this;
  }

  @before("abort")
  @after(emitter)
  get(payload) {
    return http
      .get(interpolate(this.url, payload))
      .signal(this.controller.signal)
      .json();
  }

  @connected
  [hideble]() {
    this.style.setProperty("display", "none");
    return this;
  }

  @before("abort")
  @after(emitter)
  post(payload) {
    return http
      .post(interpolate(this.url, payload))
      .body(payload)
      .signal(this.controller.signal)
      .json();
  }

  @before("abort")
  @after(emitter)
  put(payload) {
    return http
      .put(interpolate(this.url, payload))
      .body(payload)
      .signal(this.controller.signal)
      .json();
  }
}

export default Fetch;
