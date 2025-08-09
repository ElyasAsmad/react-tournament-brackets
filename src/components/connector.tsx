import React from 'react';
import useMatchHighlightContext from '../hooks/use-match-highlight';
import { getCalculatedStyles } from '../settings';
import { MatchType, OptionsType } from '../types';

function Connector({
  bracketSnippet,
  previousBottomMatchPosition,
  previousTopMatchPosition,
  currentMatchPosition,
  style,
}: {
  bracketSnippet: {
    previousTopMatch: MatchType | null;
    previousBottomMatch: MatchType | null;
    currentMatch: MatchType | null;
  } | null;
  previousBottomMatchPosition?: { x: number; y: number } | null;
  previousTopMatchPosition?: { x: number; y: number } | null;
  currentMatchPosition: { x: number; y: number };
  style: OptionsType;
}) {
  const {
    boxHeight,
    connectorColor,
    roundHeader,
    roundSeparatorWidth,
    lineInfo,
    horizontalOffset,
    connectorColorHighlight,
    width,
  } = getCalculatedStyles(style);

  const pathInfo = (multiplier: number) => {
    const middlePointOfMatchComponent = boxHeight / 2;
    const previousMatch =
      multiplier > 0 ? previousBottomMatchPosition : previousTopMatchPosition;
    const startPoint = `${
      currentMatchPosition.x - horizontalOffset - lineInfo.separation
    } ${
      currentMatchPosition.y +
      lineInfo.homeVisitorSpread * multiplier +
      middlePointOfMatchComponent +
      (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0)
    }`;
    const horizontalWidthLeft =
      currentMatchPosition.x - roundSeparatorWidth / 2 - horizontalOffset;
    const isPreviousMatchOnSameYLevel =
      Math.abs(currentMatchPosition.y - previousMatch.y) < 1;

    const verticalHeight =
      previousMatch.y +
      middlePointOfMatchComponent +
      (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0);
    const horizontalWidthRight = previousMatch.x + width;

    if (isPreviousMatchOnSameYLevel) {
      return [`M${startPoint}`, `H${horizontalWidthRight}`];
    }

    return [
      `M${startPoint}`,
      `H${horizontalWidthLeft}`,
      `V${verticalHeight}`,
      `H${horizontalWidthRight}`,
    ];
  };

  const { topHighlighted, bottomHighlighted } = useMatchHighlightContext({
    bracketSnippet,
  });

  const { x, y } = currentMatchPosition;
  return (
    <>
      {previousTopMatchPosition && (
        <path
          d={pathInfo(-1).join(' ')}
          id={`connector-${x}-${y}-${-1}`}
          fill="transparent"
          stroke={topHighlighted ? connectorColorHighlight : connectorColor}
        />
      )}
      {previousBottomMatchPosition && (
        <path
          d={pathInfo(1).join(' ')}
          id={`connector-${x}-${y}-${1}`}
          fill="transparent"
          stroke={bottomHighlighted ? connectorColorHighlight : connectorColor}
        />
      )}

      {topHighlighted && <use href={`connector-${x}-${y}-${-1}`} />}
      {bottomHighlighted && <use href={`connector-${x}-${y}-${1}`} />}
    </>
  );
}

Connector.defaultProps = {
  previousBottomMatchPosition: null,
  previousTopMatchPosition: null,
};

export default Connector;
