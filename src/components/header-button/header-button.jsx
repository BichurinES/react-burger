import React from 'react';
import styles from './header-button.module.css';

class HeaderButton extends React.Component {
  render() {
    return (
      <button className={`${styles.button} pl-5 pr-5 pb-4 pt-4`}>
        {this.props.children}
        <span className={`text text_type_main-default ${this.props.inactive ? "text_color_inactive" : null} ml-2`}>{this.props.text}</span>
      </button>
    );
  }
}

export default HeaderButton;
