import React from 'react';
import { Waypoint } from 'react-waypoint';
import clns from 'classnames';

const enumerate = size => [...Array(size + 1).keys()].slice(1);

const getWaypointOffset = (unit, fontSize) => (offset, padding) => {
	const unitOffset = offset - padding;
	const waypointOffset =
    unit === 'rem' || unit === 'em' ? unitOffset * fontSize : unitOffset;
	return waypointOffset;
};

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayBuffer: enumerate(props.pageBufferSize)
		};
	}

  getListItems = () => {
  	const result = [];
  	const { dataMap, pageMap } = this.props;
  	const { displayBuffer } = this.state;
  	displayBuffer.forEach(index => {
  		const pageContent = pageMap[index - 1];
  		if (pageContent != null) {
  			pageContent.forEach(id => {
  				result.push({ ...dataMap[id], id });
  			});
  		}
  	});
  	return result;
  };

  bufferShiftPrev = () => {
  	this.setState(({ displayBuffer }) => ({
  		displayBuffer: displayBuffer.map((page, index) =>
  			Math.max(index + 1, page - 1)
  		)
  	}));
  };

  bufferShiftNext = () => {
  	const { pageBufferSize, pageMap } = this.props;
  	const lastPage = Object.keys(pageMap).length;
  	this.setState(({ displayBuffer }) => ({
  		displayBuffer: displayBuffer.map((page, index) =>
  			Math.min(lastPage - (pageBufferSize - index) + 1, page + 1)
  		)
  	}));
  };

  resetBuffer = () => {
  	const { pageBufferSize } = this.props;
  	this.setState({
  		displayBuffer: enumerate(pageBufferSize)
  	});
  };

  render() {
  	const {
  		bottomOffset,
  		className,
  		fontSize,
  		pageMap,
  		pageSize,
  		render: ListItem,
  		topOffset,
  		unit,
  		unitBufferHeight
  	} = this.props;
  	const { displayBuffer } = this.state;

  	const pagesCount = Object.keys(pageMap).length;
  	const listObjects = this.getListItems();

  	const prevItemsCount = (displayBuffer[0] - 1) * pageSize;
  	const topPadding = unitBufferHeight * prevItemsCount;

  	const lastBufferPageIndex = displayBuffer[displayBuffer.length - 1];
  	const nextItemsCount = (pagesCount - lastBufferPageIndex) * pageSize;
  	const bottomPadding = unitBufferHeight * nextItemsCount;

  	const calculateOffset = getWaypointOffset(unit, fontSize);
  	const waypointTopOffset = calculateOffset(topOffset, topPadding);
  	const waypointBottomOffset = calculateOffset(bottomOffset, bottomPadding);

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
