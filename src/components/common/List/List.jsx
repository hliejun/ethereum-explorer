import React from 'react';
import { Waypoint } from 'react-waypoint';
import PropTypes from 'prop-types';
import clns from 'classnames';
import debounce from 'lodash.debounce';

import {
	getWaypointOffset,
	isBottomInView,
	isTopInView,
	scrollToTop
} from './helper';

import Loader from '../Loader';

import './_list.scss';

class List extends React.PureComponent {
	constructor(props) {
		super(props);

		this.debouncedToggleLoad = debounce(this.toggleLoad, 20);
		this.debouncedToggleJump = debounce(this.toggleJump, 300);

		this.topPadding = React.createRef();
		this.bottomPadding = React.createRef();

		this.state = {
			bufferEnd: props.pageBufferSize,
			bufferStart: 1,
			isBuffering: true,
			isJumpVisible: false
		};
	}

	componentWillUnmount() {
		this.debouncedToggleLoad.flush();
	}

  getListItems = () => {
  	const result = [];
  	const { dataMap, pageMap } = this.props;
  	const { bufferEnd, bufferStart } = this.state;
  	let index;
  	for (index = bufferStart; index <= bufferEnd; index += 1) {
  		const pageContent = pageMap[index - 1];
  		if (pageContent != null) {
  			pageContent.forEach(id => {
  				result.push({ ...dataMap[id], id });
  			});
  		}
  	}
  	return result;
  };

  // TODO: Try to use a debounce and reduce all consecutive calls to one

  bufferShiftPrev = () => {
  	const { pageBufferSize } = this.props;
  	this.setState(({ bufferEnd, bufferStart }) => {
  		const nextStart = Math.max(1, bufferStart - 1);
  		const nextEnd = Math.max(pageBufferSize, bufferEnd - 1);
  		return {
  			bufferEnd: nextEnd,
  			bufferStart: nextStart
  		};
  	});
  };

  bufferShiftNext = () => {
  	const { pageBufferSize, pageMap } = this.props;
  	const lastPage = pageMap.length;
  	const maxStart = Math.max(1, lastPage - pageBufferSize + 1);
  	this.setState(({ bufferEnd, bufferStart }) => {
  		const nextStart = Math.min(maxStart, bufferStart + 1);
  		const nextEnd = Math.min(lastPage, bufferEnd + 1);
  		return {
  			bufferEnd: nextEnd,
  			bufferStart: nextStart
  		};
  	});
  };

  resetBuffer = () => {
  	scrollToTop();
  	const { pageBufferSize } = this.props;
  	this.setState({
  		bufferEnd: pageBufferSize,
  		bufferStart: 1,
  		isBuffering: true
  	});
  };

  toggleLoad = () => {
  	const { isBuffering } = this.state;
  	const isBufferEdgeVisible =
      isTopInView(this.topPadding.current) ||
      isBottomInView(this.bottomPadding.current);
  	if (!isBuffering && isBufferEdgeVisible) {
  		this.setState({ isBuffering: true });
  	} else if (isBuffering && !isBufferEdgeVisible) {
  		this.setState({ isBuffering: false });
  	}
  };

  toggleJump = () => {
  	const { isJumpVisible } = this.state;
  	const topPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
  	const height = window.innerHeight || document.documentElement.clientHeight;
  	if (!isJumpVisible && topPosition > height) {
  		this.setState({ isJumpVisible: true });
  	} else if (isJumpVisible && topPosition <= height) {
  		this.setState({ isJumpVisible: false });
  	}
  };

  toggleInterface = () => {
  	this.debouncedToggleJump();
  	this.debouncedToggleLoad();
  };

  render() {
  	const {
  		bottomOffset,
  		className,
  		dataMap,
  		fontSize,
  		onRefresh,
  		pageMap,
  		pageSize,
  		placeholder,
  		render: ListItem,
  		topOffset,
  		unit,
  		unitBufferHeight,
  		...otherProps
  	} = this.props;
  	const { bufferEnd, bufferStart, isBuffering, isJumpVisible } = this.state;

  	const pagesCount = pageMap.length;
  	const listObjects = this.getListItems();

  	const prevItemsCount = (bufferStart - 1) * pageSize;
  	const topPadding = unitBufferHeight * prevItemsCount;

  	const lastBufferPageIndex = bufferEnd;
  	const nextItemsCount = (pagesCount - lastBufferPageIndex) * pageSize;
  	const bottomPadding = unitBufferHeight * nextItemsCount;

  	const calculateOffset = getWaypointOffset(unit, fontSize);
  	const waypointTopOffset = calculateOffset(topOffset, topPadding);
  	const waypointBottomOffset = calculateOffset(bottomOffset, bottomPadding);

  	return (
  		<div className={clns('list', className)}>
  			<Waypoint
  				fireOnRapidScroll
  				key={`top-${topPadding}-${bottomPadding}`}
  				onEnter={this.bufferShiftPrev}
  				onPositionChange={this.toggleInterface}
  				topOffset={`${waypointTopOffset}px`}
  			/>
  			<Loader className="list__loader" isLoading={isBuffering} />
  			<div className="list__content">
  				{listObjects && listObjects.length > 0 ? (
  					<React.Fragment>
  						<div
  							className="list__top-padding"
  							ref={this.topPadding}
  							style={{
  								content: '',
  								height: `${topPadding}${unit}`
  							}}
  						/>
  						{listObjects.map(props => (
  							<ListItem {...otherProps} {...props} key={props.id} />
  						))}
  						<div
  							className="list__bottom-padding"
  							ref={this.bottomPadding}
  							style={{
  								content: '',
  								height: `${bottomPadding}${unit}`
  							}}
  						/>
  					</React.Fragment>
  				) : (
  					placeholder
  				)}
  			</div>
  			<Waypoint
  				bottomOffset={`${waypointBottomOffset}px`}
  				fireOnRapidScroll
  				key={`bottom-${topPadding}-${bottomPadding}`}
  				onEnter={this.bufferShiftNext}
  				onPositionChange={this.toggleInterface}
  			/>
  			{listObjects && listObjects.length > 0 && (
  				<div className="list__footer">
  					<span className="list__footer-title monotype">
              End of Transaction History
  					</span>
  					<span className="list__footer-subtitle monotype">
              * capped at last 1000 entries *
  					</span>
  				</div>
  			)}
  			{isJumpVisible && (
  				<button
  					className="list__jump"
  					onClick={this.resetBuffer}
  					type="button"
  				>
  					<span className="list__jump-label monotype">▲ Back to top ▲</span>
  				</button>
  			)}
  		</div>
  	);
  }
}

List.propTypes = {
	bottomOffset: PropTypes.number,
	className: PropTypes.string,
	dataMap: PropTypes.objectOf(PropTypes.any).isRequired,
	fontSize: PropTypes.number,
	onRefresh: PropTypes.func,
	pageBufferSize: PropTypes.number.isRequired,
	pageMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
	pageSize: PropTypes.number.isRequired,
	placeholder: PropTypes.node,
	render: PropTypes.elementType.isRequired,
	topOffset: PropTypes.number,
	unit: PropTypes.oneOf(['em', 'pt', 'px', 'rem']),
	unitBufferHeight: PropTypes.number
};

List.defaultProps = {
	bottomOffset: 0,
	className: null,
	fontSize: 16,
	onRefresh: null,
	placeholder: null,
	topOffset: 0,
	unit: 'px',
	unitBufferHeight: 200
};

export default List;
