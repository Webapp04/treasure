import NFKey from "./NFKey";
import { ViewportList } from "react-viewport-list";
import { useRef } from "react";

export default function DashboardTokenList({
  onOpenModal,
  isAnimated,
  filterTokenList,
}) {
  const ref = useRef(null);

  if (!filterTokenList?.length) return null;

  return (
    <div className="scroll-container" ref={ref}>
      <ViewportList viewportRef={ref} items={filterTokenList}>
        {(token) => (
          <div
            className="dashboard__data__content--list__item key"
            key={token.tokenId}
            onClick={onOpenModal}
          >
            <NFKey {...token} isAnimated={isAnimated} />
          </div>
        )}
      </ViewportList>
    </div>
  );
  //   return filterTokenList?.map((token, key) => (
  //     <div
  //       className="dashboard__data__content--list__item key"
  //       key={token.tokenId}
  //       onClick={onOpenModal}
  //     >
  //       <NFKey {...token} isAnimated={isAnimated} />
  //     </div>
  //   ));
}
