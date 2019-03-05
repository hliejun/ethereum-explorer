import React from 'react';
import { Waypoint } from 'react-waypoint';
import throttle from 'lodash.throttle';
import clns from 'classnames';

// TODO: Add error boundary and async loaders

const enumerate = size => [...Array(size + 1).keys()].slice(1);

class List extends React.Component {
	constructor(props) {
		super(props);

		this.getListItems = this.getListItems.bind(this);
		this.bufferShiftPrev = this.bufferShiftPrev.bind(this);
		this.bufferShiftNext = this.bufferShiftNext.bind(this);
		this.resetBuffer = this.resetBuffer.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.throttledUpdateDimensions = throttle(this.updateDimensions, 600);

		this.state = {
			displayBuffer: enumerate(props.pageBufferSize),
			dimensions: {
				height: 0,
				width: 0
			}
		};
	}

	componentDidMount() {
		this.throttledUpdateDimensions();
		window.addEventListener('resize', this.throttledUpdateDimensions, false);
	}

	componentWillUnmount() {
		this.throttledUpdateDimensions.flush();
		window.removeEventListener('resize', this.throttledUpdateDimensions, false);
	}

	getListItems() {
		const result = [];
		const { pageMap, dataMap } = this.props;
		const { displayBuffer } = this.state;

		displayBuffer.forEach(index => {
			const pageContent = pageMap[index];
			pageContent.forEach(id => {
				result.push({ ...dataMap[id], id });
			});
		});

		return result;
	}

	updateDimensions() {
		this.setState({
			dimensions: {
				width: window.innerWidth,
				height: window.innerHeight
			}
		});
	}

	bufferShiftPrev() {
		this.setState(({ displayBuffer }) => ({
			displayBuffer: displayBuffer.map((page, index) =>
				Math.max(index + 1, page - 1)
			)
		}));
	}

	bufferShiftNext() {
		const { pageBufferSize, pageMap } = this.props;
		const lastPage = Object.keys(pageMap).length;
		this.setState(({ displayBuffer }) => ({
			displayBuffer: displayBuffer.map((page, index) =>
				Math.min(lastPage - (pageBufferSize - index) + 1, page + 1)
			)
		}));
	}

	resetBuffer() {
		const { pageBufferSize } = this.props;
		this.setState({
			displayBuffer: enumerate(pageBufferSize)
		});
	}

	render() {
		const {
			bottomOffset,
			itemRenderer: ListItem,
			pageMap,
			topOffset,
			unit,
			unitBufferHeight,
			className
		} = this.props;
		const { displayBuffer, dimensions } = this.state;

		const listObjects = this.getListItems();
		const pageSize = pageMap[1].length;

		const prevBufferPageIndex = displayBuffer[0] - 1;
		const prevItemsCount = prevBufferPageIndex * pageSize;
		const topPadding = unitBufferHeight * prevItemsCount;

		const pagesCount = Object.keys(pageMap).length;
		const lastBufferPageIndex = displayBuffer[displayBuffer.length - 1];
		const nextItemsCount = (pagesCount - lastBufferPageIndex) * pageSize;
		const bottomPadding = unitBufferHeight * nextItemsCount;

		const fontSize = dimensions.width >= 768 ? 16 : 14;
		let waypointTopOffset = -topPadding + topOffset;
		waypointTopOffset =
      unit === 'rem' || unit === 'em'
      	? waypointTopOffset * fontSize
      	: waypointTopOffset;
		let waypointBottomOffset = -bottomPadding + bottomOffset;
		waypointBottomOffset =
      unit === 'rem' || unit === 'em'
      	? waypointBottomOffset * fontSize
      	: waypointBottomOffset;

		return (
			<div className={clns('list', className)}>
				<Waypoint
					key={`top-${topPadding}-${bottomPadding}`}
					onEnter={this.bufferShiftPrev}
					topOffset={`${waypointTopOffset}px`}
				/>
				<div className="list__content">
					<div
						className="list__top-padding"
						style={{ content: '', height: `${topPadding}${unit}` }}
					/>
					{listObjects.map(props => (
						<ListItem key={props.id} {...props} />
					))}
					<div
						className="list__bottom-padding"
						style={{ content: '', height: `${bottomPadding}${unit}` }}
					/>
				</div>
				<Waypoint
					bottomOffset={`${waypointBottomOffset}px`}
					key={`bottom-${topPadding}-${bottomPadding}`}
					onEnter={this.bufferShiftNext}
				/>
			</div>
		);
	}
}

export default List;
