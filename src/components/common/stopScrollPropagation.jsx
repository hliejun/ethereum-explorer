import React from 'react';

const disablePropagation = event => {
	event.stopPropagation();
};

const stopScrollPropagation = WrappedComponent => {
	class StopScrollPropagation extends React.Component {
		constructor(props) {
			super(props);
			this.element = React.createRef();
		}

		componentDidMount() {
			this.element.current.addEventListener(
				'touchmove',
				disablePropagation,
				false
			);
		}

		componentWillUnmount() {
			this.element.current.removeEventListener(
				'touchmove',
				disablePropagation,
				false
			);
		}

		render() {
			return <WrappedComponent {...this.props} ref={this.element} />;
		}
	}

	return StopScrollPropagation;
};

export default stopScrollPropagation;
