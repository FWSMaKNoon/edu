export const HeartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#HeartFill_clip0)">
            <g filter="url(#HeartFill_filter0_d)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.5 2.25C10.5 2.25 12 4.25 12 4.25C12 4.25 13.5 2.25 16.5 2.25C20 2.25 22.5 5 22.5 8.5C22.5 12.5 19.23 16.07 16.25 18.75C14.41 20.41 13 21.5 12 21.5C11 21.5 9.55 20.4 7.75 18.75C4.82 16.07 1.5 12.5 1.5 8.5C1.5 5 4 2.25 7.5 2.25Z"
                ></path>
            </g>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.4 12.2C3.59 14.7 5.76 16.93 7.75 18.75C9.55 20.4 11 21.5 12 21.5C13 21.5 14.41 20.41 16.25 18.75C19.23 16.07 22.5 12.5 22.5 8.5C22.5 8.41 22.5 8.33 22.5 8.24C20.57 13.66 13.68 18.5 11.75 18.5C10.31 18.5 5.61 15.81 2.4 12.2Z"
                fillOpacity="0.03"
            ></path>
        </g>
        <defs>
            <filter
                id="HeartFill_filter0_d"
                x="-0.9"
                y="1.05"
                width="25.8"
                height="24.05"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                ></feColorMatrix>
                <feOffset dy="1.2"></feOffset>
                <feGaussianBlur stdDeviation="1.2"></feGaussianBlur>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
            </filter>
            <clipPath id="HeartFill_clip0">
                <rect width="24" height="24" fill="white"></rect>
            </clipPath>
        </defs>
    </svg>
);
