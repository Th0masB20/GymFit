function mouseDown(
  setIsDown: React.Dispatch<React.SetStateAction<boolean>>,
  e: React.TouchEvent<HTMLDivElement>,
  sliderRef: React.RefObject<HTMLDivElement>,
  setStartY: React.Dispatch<React.SetStateAction<number>>,
  setStartScrollY: React.Dispatch<React.SetStateAction<number>>,
) {
  e.preventDefault();
  e.stopPropagation();
  setIsDown(true);
  const startY = e.touches[0].clientY;
  const startScrollY = Number(
    sliderRef.current?.style.transform.substring(
      11,
      sliderRef.current?.style.transform.length - 3,
    ),
  );

  setStartY(startY);
  setStartScrollY(startScrollY);
}
function mouseUp(
  setIsDown: React.Dispatch<React.SetStateAction<boolean>>,
  setTranslate: React.Dispatch<React.SetStateAction<number>>,
  calContainerRef: React.RefObject<HTMLDivElement>,
) {
  if (!calContainerRef.current) return;
  if (!calContainerRef.current.firstElementChild) return;
  const currentTranslate = Number(
    calContainerRef.current.style.transform.substring(
      11,
      calContainerRef.current.style.transform.length - 3,
    ),
  );
  const calendarMonthHeight =
    calContainerRef.current.firstElementChild.getBoundingClientRect().height +
    40;

  const quotient = currentTranslate / calendarMonthHeight;
  if (!Number.isInteger(quotient)) {
    let roundedQuotient = Math.round(quotient);

    if (roundedQuotient * calendarMonthHeight < -calendarMonthHeight * 11) {
      roundedQuotient = Math.ceil(quotient);
    }

    if (roundedQuotient * calendarMonthHeight >= 0) {
      roundedQuotient = 0;
    }

    if (roundedQuotient < -11) {
      roundedQuotient = -11;
    }

    const translate = roundedQuotient * calendarMonthHeight;
    calContainerRef.current.style.transform = `translateY(${translate}px)`;
    setTranslate(translate);
  }

  setIsDown(false);
}
function mouseLeave(setIsDown: React.Dispatch<React.SetStateAction<boolean>>) {
  setIsDown(false);
}

function mouseMove(
  isDown: boolean,
  startScrollY: number,
  startY: number,
  e: React.TouchEvent<HTMLDivElement>,
  setTranslate: React.Dispatch<React.SetStateAction<number>>,
  setIsDown: React.Dispatch<React.SetStateAction<boolean>>,
  calContainerRef: React.RefObject<HTMLDivElement>,
) {
  e.preventDefault();
  e.stopPropagation();
  if (!isDown) return;
  if (!calContainerRef.current || !calContainerRef.current.firstElementChild)
    return;
  const speed = 3.5;
  const moveAmount = (startY - e.touches[0].clientY) * speed;
  const sliderMoveAmount = startScrollY - moveAmount;

  const calendarMonthHeight =
    calContainerRef.current.firstElementChild.getBoundingClientRect().height +
    40;

  calContainerRef.current.style.transform = `translateY(${sliderMoveAmount}px)`;
  //move down
  if (
    moveAmount >= calendarMonthHeight / 2 &&
    startScrollY > -calendarMonthHeight * 11
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
