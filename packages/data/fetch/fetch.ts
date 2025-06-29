import { interpolate } from "@directive/render/interpolate";
import { after, before } from "@middleware";
import { Headless } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import http from "./http";
import { abort, dispatch } from "./interface";

@define("x-fetch")
class Fetch extends Echo(Headless(HTMLElement)) {
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

  [abort](payload) {
    this.controller.abort();
    this.#controller = new AbortController();
    return payload;
  }

  @before(abort)
  @after(dispatch)
  delete(payload) {
    return http
      .delete(interpolate(this.url, payload))
      .signal(this.controller.signal)
      .json();
  }

  [dispatch](response) {
    requestIdleCallback(async () => {
      const { data, error } = await response;
      error
        ? this.dispatchEvent(new CustomEvent("error", { detail: data }))
        : this.dispatchEvent(new CustomEvent("ok", { detail: data }));
    });
    return this;
  }

  @before(abort)
  @after(dispatch)
  get(payload) {
    return http
      .get(interpolate(this.url, payload))
      .signal(this.controller.signal)
      .json();
  }

  @before(abort)
  @after(dispatch)
  post(payload) {
    return http
      .post(interpolate(this.url, payload))
      .body(payload)
      .signal(this.controller.signal)
      .json();
  }

  @before(abort)
  @after(dispatch)
  put(payload) {
    return http
      .put(interpolate(this.url, payload))
      .body(payload)
      .signal(this.controller.signal)
      .json();
  }
}

export default Fetch;
