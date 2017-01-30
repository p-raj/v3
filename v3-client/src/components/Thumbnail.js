import React from "react";


export default class Thumbnail extends React.Component {
    render() {
        return (
            <img role="presentation"
                 width={50} height={50}
                 src={this.props.url}
                 onClick={this.props.onClick}/>
        )
    }
}
