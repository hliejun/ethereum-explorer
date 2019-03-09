import React from 'react';

const stopPropagatingEvent = event => {
	event.stopPropagation();
};

const cancelEvent = event => {
	event.preventDefault();
	event.stopImmediatePropagation();
};

const handleEvent = handler => WrappedComponent => {
	class HandleEvent extends React.Component {
		constructor(props) {
			super(props);
			this.element = React.createRef();
		}

		componentDidMount() {
			this.element.current.addEventListener('touchmove', handler, false);
		}

		componentWillUnmount() {
			this.element.current.removeEventListener('touchmove', handler, false);
		}

		render() {
			return <WrappedComponent {...this.props} ref={this.element} />;
		}
	}

	return HandleEvent;
};

const stopScrollPropagation = handleEvent(stopPropagatingEvent);

const stopScroll = handleEvent(cancelEvent);

export { stopScrollPropagation, stopScroll };
