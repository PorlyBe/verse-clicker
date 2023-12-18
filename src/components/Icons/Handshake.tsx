import React, { FC } from "react";

interface Props {
  size?: number | string;
}

const Handshake: FC<Props> = ({ size = 16 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.9193 13.3476C7.75776 13.3476 7.62144 13.2952 7.51033 13.1905C7.39922 13.0858 7.34366 12.9495 7.34366 12.7815C7.34366 12.6918 7.36278 12.6041 7.40103 12.5184C7.43928 12.4327 7.48555 12.3617 7.53981 12.3053L9.71288 10.1354C9.7586 10.0897 9.78146 10.0288 9.78146 9.9527C9.78146 9.87664 9.7586 9.81574 9.71288 9.77002C9.6539 9.71319 9.58862 9.68616 9.51705 9.68894C9.44547 9.69171 9.38895 9.71382 9.3475 9.75527L7.1629 11.9232C7.10648 11.9796 7.03512 12.0269 6.9488 12.0652C6.86247 12.1034 6.77722 12.1226 6.69303 12.1226C6.52507 12.1226 6.3849 12.0664 6.27251 11.954C6.16012 11.8416 6.10393 11.7014 6.10393 11.5335C6.10393 11.4668 6.12412 11.3882 6.1645 11.2976C6.20488 11.207 6.25499 11.1318 6.31481 11.0719L8.47121 8.89887C8.51695 8.85314 8.53981 8.79309 8.53981 8.71874C8.53981 8.64438 8.51695 8.58434 8.47121 8.53862C8.41225 8.48177 8.34451 8.45442 8.26801 8.45657C8.19151 8.4587 8.13254 8.4805 8.0911 8.52195L5.92123 10.7066C5.88148 10.7442 5.81738 10.784 5.72893 10.8261C5.64046 10.8682 5.55456 10.8892 5.47123 10.8892C5.3067 10.8892 5.17016 10.8344 5.06161 10.7248C4.95307 10.6152 4.8988 10.4781 4.8988 10.3136C4.8988 10.2294 4.91429 10.1455 4.94528 10.062C4.97626 9.97845 5.02166 9.90676 5.0815 9.84694L7.1725 7.75592C7.22933 7.69909 7.25775 7.63541 7.25775 7.5649C7.25775 7.49439 7.22933 7.43071 7.1725 7.37387C7.11352 7.31704 7.04578 7.28969 6.9693 7.29182C6.8928 7.29396 6.82826 7.32131 6.7757 7.37387L4.70136 9.45014C4.65051 9.50099 4.57807 9.54661 4.48406 9.587C4.39004 9.62738 4.30798 9.64757 4.2379 9.64757C4.07678 9.64757 3.94057 9.59191 3.82925 9.48059C3.71792 9.36926 3.66226 9.23305 3.66226 9.07194C3.66226 8.98432 3.67914 8.89821 3.7129 8.8136C3.74666 8.72899 3.79068 8.65955 3.84496 8.60527L6.60071 5.86617C6.6661 5.80079 6.76439 5.76425 6.89558 5.75655C7.02678 5.74886 7.12058 5.77323 7.177 5.82964L8.06095 6.71359C8.19556 6.85033 8.34556 6.94478 8.51095 6.99692C8.67632 7.04905 8.85645 7.07512 9.05133 7.07512C9.4056 7.07512 9.70217 6.9513 9.94106 6.70365C10.18 6.456 10.2994 6.1638 10.2994 5.82705C10.2994 5.63346 10.2591 5.46102 10.1786 5.30974C10.098 5.15846 9.99918 5.0215 9.88208 4.89885L8.18148 3.20145L8.611 2.77194C8.82851 2.50015 9.09837 2.28605 9.4206 2.12964C9.74282 1.97323 10.0954 1.89502 10.4783 1.89502C10.7608 1.89502 11.0432 1.95378 11.3257 2.0713C11.6082 2.18883 11.846 2.34416 12.0392 2.53732L13.9199 4.40335C14.1123 4.5978 14.2677 4.83498 14.3863 5.11489C14.5049 5.3948 14.5642 5.67044 14.5642 5.9418C14.5642 6.29095 14.5006 6.6137 14.3735 6.91007C14.2463 7.20644 14.0755 7.46295 13.861 7.67962L8.38598 13.1732C8.35136 13.2078 8.28543 13.2455 8.18821 13.2864C8.09099 13.3272 8.00135 13.3476 7.9193 13.3476ZM3.17125 8.53027L2.11226 7.47129C1.88791 7.23923 1.71846 6.97224 1.60393 6.67032C1.4894 6.3684 1.43213 6.0606 1.43213 5.74692C1.43213 5.43752 1.48266 5.14137 1.58373 4.85847C1.68481 4.57557 1.84346 4.33049 2.0597 4.12322L3.66033 2.53732C3.86546 2.3322 4.09762 2.17386 4.3568 2.06232C4.61598 1.95079 4.91374 1.89502 5.25006 1.89502C5.53382 1.89502 5.80839 1.95955 6.07378 2.0886C6.33916 2.21767 6.57142 2.37344 6.77056 2.5559L9.50196 5.27064C9.57546 5.34415 9.63465 5.43603 9.67953 5.54629C9.7244 5.65654 9.74683 5.7606 9.74683 5.85845C9.74683 6.0576 9.67546 6.2263 9.53273 6.36455C9.39 6.5028 9.21906 6.57192 9.01991 6.57192C8.89512 6.57192 8.77621 6.54863 8.66318 6.50205C8.55015 6.45546 8.46585 6.40439 8.4103 6.34884L7.60456 5.51169C7.40926 5.31853 7.17347 5.22195 6.8972 5.22195C6.62091 5.22195 6.38512 5.31853 6.18983 5.51169L3.17125 8.53027Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Handshake;