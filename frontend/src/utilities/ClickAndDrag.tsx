function mouseDown(
  setIsDown: React.Dispatch<React.SetStateAction<boolean>>,
  e: React.TouchEvent<HTMLDivElement>,
  sliderRef: React.RefObject<HTMLDivElement>,
  setStartY: React.Dispatch<React.SetStateAction<number>>,
  setStartScrollY: React.Dispatch<React.SetStateAction<number>>
) {
  setIsDown(true);
  const startY = e.touches[0].clientY;
  const startScrollY = Number(
    sliderRef.current?.style.transform.substring(
      11,
      sliderRef.current?.style.transform.length - 3
    )
  );

  setStartY(startY);
  setStartScrollY(startScrollY);
}
function mouseUp(
  setIsDown: React.Dispatch<React.SetStateAction<boolean>>,
  currentTranslate: number,
  setTranslate: React.Dispatch<React.SetStateAction<number>>,
  calContainerRef: React.RefObject<HTMLDivElement>
) {
  let calendarMonthHeight = 590;
  if (calContainerRef.current && calContainerRef.current.firstElementChild) {
    calendarMonthHeight =
      calContainerRef.current.firstElementChild.getBoundingClientRect().height +
      40;
  }

  const quotient = currentTranslate / calendarMonthHeight;
  if (!Number.isInteger(quotient)) {
    let roundedQuotient = Math.round(quotient);

    if (roundedQuotient * calendarMonthHeight <= calendarMonthHeight * 11) {
      roundedQuotient = Math.ceil(quotient);
    }

    if (roundedQuotient * calendarMonthHeight >= 0) {
      roundedQuotient = 0;
    }
    setTranslate(roundedQuotient * calendarMonthHeight);
  }

  setIsDown(false);
}
function mouseLeave(setIsDown: React.Dispatch<React.SetStateAction<boolean>>) {
  console.log("mouse leave");
  setIsDown(false);
}

function mouseMove(
  isDown: boolean,
  startScrollY: number,
  startY: number,
  e: React.TouchEvent<HTMLDivElement>,
  setTranslate: React.Dispatch<React.SetStateAction<number>>,
  setIsDown: React.Dispatch<React.SetStateAction<boolean>>,
  calContainerRef: React.RefObject<HTMLDivElement>
) {
  if (!isDown) return;
  const moveAmount = startY - e.touches[0].clientY;
  const sliderMoveAmount = startScrollY - moveAmount;

  let calendarMonthHeight = 590;
  if (calContainerRef.current && calContainerRef.current.firstElementChild) {
    calendarMonthHeight =
      calContainerRef.current.firstElementChild.getBoundingClientRect().height +
      40;
  }

  setTranslate(sliderMoveAmount);

  //move down
  if (
    moveAmount >= calendarMonthHeight / 2 &&
    startScrollY != -calendarMonthHeight * 11
  ) {
    setTranslate((startScrollY -= calendarMonthHeight));
    setIsDown(false);
    return;
  }

  //move up
  if (-moveAmount >= calendarMonthHeight / 2 && startScrollY != 0) {
    setTranslate((startScrollY += calendarMonthHeight));
    setIsDown(false);
    return;
  }
}

export { mouseDown, mouseUp, mouseLeave, mouseMove };
