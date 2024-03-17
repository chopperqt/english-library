import { memo } from "react";

import Spin from "@components/spin";

const Preloader = () => (
  <div className="flex fixed w-screen h-screen justify-center items-center bg-neutral-300/50 z-50">
    <Spin color="indigo" width={90} height={90} />
  </div>
);

export default memo(Preloader);
