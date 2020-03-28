import React from "react";
import PT from "prop-types";
import { ChromePicker } from "react-color";

import Palette from "./Palette";

function Configurator({
  theme,
  themeType,
  primaryColor,
  updatePrimaryColor,
  updateThemeType
}) {
  function onChangeThemeType(event) {
    updateThemeType(event.target.value);
  }
  function onColorPickerChange({ hex }) {
    updatePrimaryColor(hex);
  }
  const {
    columnBG,
    activeItem,
    activeItemText,
    hoverItem,
    textColor,
    activePresence,
    mentionBadge,
    topNavBG,
    topNavText
  } = theme;
  const slackTheme = [
    columnBG,
    // TODO: What does this color mean? The second color appears to be equal to
    // the hoverItem color in all the integrated themes, but if I change it to
    // something obvious like #ff00ff I can't see it appear anywhere in the UI.
    //
    // https://twitter.com/wavebeem/status/1243741888944857088
    hoverItem,
    activeItem,
    activeItemText,
    hoverItem,
    textColor,
    activePresence,
    mentionBadge,
    topNavBG,
    topNavText
  ].join(",");
  const selectAll = event => {
    event.target.focus();
    event.target.select();
  };
  const radioClass = "ph2 pv1 br2 db lh-copy";
  return (
    <div className="flex-auto min-h-100">
      <header className="ph3 bb b--cool pv2">
        <h1 className="db mt0 mb1 f5">#legal-notice</h1>
        <h2 className="db gray ma0 f5 normal">
          This product is not endorsed by, affiliated with, or supported by
          Slack Technologies, Inc.{" "}
          <span role="img" aria-label="judge emoji">
            👨‍⚖️
          </span>
        </h2>
      </header>
      <div className="cool-grid flex-auto">
        <Palette
          themeType={themeType}
          updatePrimaryColor={updatePrimaryColor}
        />
        <div>
          <ChromePicker
            color={primaryColor}
            disableAlpha={true}
            onChange={onColorPickerChange}
          />
          <div className="db pv3">
            <h2 className="b f5 mv1">Theme type</h2>
            <label className={radioClass}>
              <input
                type="radio"
                name="theme-type"
                value="light"
                checked={themeType === "light"}
                onChange={onChangeThemeType}
              />
              <span className="ml2 br2 ph1 dib ba b--black-10 bg-near-white dark-gray">
                Light theme
              </span>
            </label>
            <label className={radioClass}>
              <input
                type="radio"
                name="theme-type"
                value="dark"
                checked={themeType === "dark"}
                onChange={onChangeThemeType}
              />
              <span className="ml2 br2 ph1 dib ba b--white-30 bg-near-black light-gray">
                Dark theme
              </span>
            </label>
          </div>
        </div>
        <div class="flex flex-column">
          <label className="db">
            <h2 className="b f4 mt0 mb1">
              Send this as a message to switch themes
            </h2>
            <textarea
              onFocus={selectAll}
              onChange={() => {}}
              value={slackTheme}
              rows={3}
              spellCheck={false}
              className="border-box w-100 cool-textarea bw1 ba br2 pa2 code"
            />
          </label>
          <div className="flex-auto">
            <p>
              Note that you will still need to choose a dark or light background
              separately from applying this theme
            </p>
            <footer className="o-80 f5">
              &copy; {new Date().getFullYear() + " "}
              <a className="color-inherit b" href="https://mockbrian.com">
                Brian Mock
              </a>{" "}
              <span role="img" aria-label="nerd face emoji">
                🤓
              </span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

Configurator.displayName = "Configurator";

Configurator.propTypes = {
  theme: PT.object.isRequired,
  updateBadgeType: PT.func.isRequired,
  updatePrimaryColor: PT.func.isRequired,
  updateThemeType: PT.func.isRequired
};

export default Configurator;
