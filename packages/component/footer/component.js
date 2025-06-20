import { html } from "@nodusjs/std/dom";

export const component = () =>
  html`
    <header>
      <x-container>
        <content>
          <slot></slot>
          <action>
            <slot name="action"></slot>
          </action>
        </content>
      </x-container>
    </header>
  `;
