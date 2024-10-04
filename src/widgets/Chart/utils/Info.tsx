// import { useContext } from "react";
// import { internalInfoContext, lgContext } from "../../../app/providers/Providers";
// import { EStatusText } from "../../../interfaces/interface";
// import { language } from "../../../utils/language";

// export const Info = () => {
//   const info = useContext(internalInfoContext);
//   const { lg } = useContext(lgContext);

//   function element(text: string) {
//     return (
//       <div className="absolute top-4 left-1/2 transform -translate-x-1/2 rounded-md text-[11px] text-t-grey text-center bg-body-transparent z-30 p-2">
//         {text.toUpperCase()}
//       </div>
//     );
//   }

//   if (info.Text === EStatusText.CloseTrades && info.Time2End > 0) {
//     return element(language[lg].info.mining);
//   } else if (info.Text === EStatusText.Distribution) {
//     return element(language[lg].info.distribution);
//   } else {
//     <></>;
//   }
// }
