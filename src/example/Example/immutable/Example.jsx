import React, { PureComponent } from "react";

export default class Example extends PureComponent {
  componentDidMount () {
    this.props.getFoo ();
    this.props.getBar ();
  }
  render () {
    const { foo, bar } = this.props;
    return <h2 children={`Hello, ${foo.get ("data")} ${bar.get ("data")}!`} />;
  }
}
