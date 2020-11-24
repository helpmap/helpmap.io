import React from 'react';

const SvgComponent = (props) => (
  <svg viewBox="-27 0 512 512" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" {...props}>
    <path d="M458.016 73.855c0-17.293-14.07-31.363-31.364-31.363-4.25 0-8.3.856-12 2.395-3.058-14.11-15.632-24.711-30.644-24.711-4.438 0-8.66.93-12.492 2.601C367.773 9.645 355.676 0 341.359 0c-14.312 0-26.41 9.645-30.156 22.777a31.125 31.125 0 0 0-12.488-2.601c-17.293 0-31.36 14.066-31.36 31.36v78.57c-7.144-7.57-17.832-11.489-28.714-9.57-8.493 1.5-15.856 6.241-20.73 13.355a31.079 31.079 0 0 0-1.454 2.343 29.88 29.88 0 0 0-14.223-3.582c-3.832 0-7.492.73-10.867 2.04-3.187-13.2-15.09-23.04-29.254-23.04-4.02 0-7.855.801-11.363 2.239-3.797-12.274-15.254-21.215-28.758-21.215s-24.96 8.941-28.758 21.215a29.9 29.9 0 0 0-11.363-2.239c-16.598 0-30.098 13.504-30.098 30.098v72.48c-6.824-6.578-16.586-9.894-26.527-8.144-8.144 1.437-15.21 5.988-19.887 12.812-4.675 6.825-6.37 15.055-4.773 23.172l10.523 53.364c4.188 21.238 14.504 40.543 29.832 55.824l18.79 18.734v31.992H49.14c-5.524 0-10 4.477-10 10V502c0 5.523 4.476 10 10 10 5.52 0 10-4.477 10-10v-80.016h130.53V502c0 5.523 4.477 10 10 10s10-4.477 10-10v-90.016c0-5.523-4.476-10-10-10h-10.323v-31.992l11.105-11.07c20.559-20.5 31.879-47.781 31.879-76.813v-41.87a114.398 114.398 0 0 0 23.324 33.534l20.156 20.098V333H263.93c-5.524 0-10 4.477-10 10v159c0 5.523 4.476 10 10 10 5.52 0 10-4.477 10-10V393h48.394c5.524 0 10-4.477 10-10s-4.476-10-10-10H273.93v-20h140v149c0 5.523 4.476 10 10 10 5.52 0 10-4.477 10-10V343c0-5.523-4.48-10-10-10h-11.606v-39.129l11.988-11.95c21.731-21.671 33.7-50.51 33.7-81.198v-10.387c0-5.524-4.477-10-10-10-5.52 0-10 4.476-10 10v10.387c0 25.336-9.88 49.144-27.82 67.035l-14.926 14.883a9.998 9.998 0 0 0-2.942 7.082V333h-96.511v-43.277a9.992 9.992 0 0 0-2.942-7.082l-23.094-23.028c-13.375-13.34-22.379-30.187-26.03-48.718l-11.188-56.723a11.735 11.735 0 0 1 1.847-8.977 11.75 11.75 0 0 1 7.707-4.96c6.121-1.083 12.067 2.8 13.543 8.831l5.782 23.575c1.605 6.558 7.636 10.73 14.343 9.922s11.574-6.301 11.574-13.055V51.535c0-6.265 5.094-11.36 11.36-11.36 5.836 0 10.652 4.423 11.285 10.095v65.738c0 .398.027.789.074 1.176v6.421c0 5.524 4.477 10 10 10 5.524 0 10-4.476 10-10v-72.07c0-.691-.031-1.379-.074-2.062V31.359C330 25.098 335.098 20 341.36 20c6.265 0 11.359 5.098 11.359 11.36v18.113a32.857 32.857 0 0 0-.074 2.062v64.473c0 .398.03.789.074 1.176v6.421c0 5.524 4.48 10 10 10 5.523 0 10-4.476 10-10V50.27c.633-5.672 5.449-10.094 11.285-10.094 6.266 0 11.36 5.094 11.36 11.36v20.257a32.75 32.75 0 0 0-.075 2.062v42.153c0 .398.031.789.074 1.176v6.421c0 5.524 4.48 10 10 10 5.524 0 10-4.476 10-10v-51.02c.633-5.667 5.453-10.093 11.285-10.093 6.266 0 11.364 5.098 11.364 11.363v36.477c0 5.523 4.476 10 10 10 5.52 0 10-4.477 10-10V73.855zM212.332 282.11c0 23.68-9.234 45.93-26 62.649l-14.043 14.004a9.992 9.992 0 0 0-2.941 7.082v36.14H79.73v-36.14a9.992 9.992 0 0 0-2.94-7.082l-21.724-21.664c-12.504-12.47-20.918-28.211-24.332-45.535l-10.523-53.364c-.55-2.8.031-5.64 1.648-7.996a10.458 10.458 0 0 1 6.86-4.422c5.457-.957 10.75 2.5 12.066 7.871l5.438 22.18c1.586 6.465 7.527 10.574 14.144 9.777 6.61-.796 11.406-6.207 11.406-12.867V141.75c0-5.566 4.532-10.098 10.098-10.098 5.176 0 9.453 3.922 10.024 8.95v61.804c0 .39.027.77.07 1.145v6.008c0 5.523 4.48 10 10 10 5.523 0 10-4.477 10-10V141.75c0-.656-.028-1.305-.07-1.953V122.77c0-5.567 4.53-10.094 10.097-10.094 5.57 0 10.098 4.527 10.098 10.094v17.015a29.82 29.82 0 0 0-.07 1.965v60.656c0 .39.027.774.07 1.153v6c0 5.52 4.476 10 10 10 5.523 0 10-4.48 10-10v-68.965c.574-5.024 4.847-8.942 10.023-8.942 5.57 0 10.098 4.532 10.098 10.098v19.035c-.043.649-.07 1.305-.07 1.965v39.656c0 .39.027.774.07 1.153v6c0 5.52 4.48 10 10 10 5.523 0 10-4.48 10-10v-47.965c.578-5.024 4.851-8.942 10.027-8.942 5.567 0 10.094 4.532 10.094 10.098zm0 0" />
    <path d="M448.012 140.328a10.06 10.06 0 0 0-7.07 2.934 10.054 10.054 0 0 0-2.93 7.066c0 2.64 1.066 5.211 2.93 7.082a10.075 10.075 0 0 0 7.07 2.918 10.06 10.06 0 0 0 7.066-2.918 10.06 10.06 0 0 0 2.934-7.082c0-2.629-1.063-5.207-2.934-7.066a10.044 10.044 0 0 0-7.066-2.934zm0 0M362.32 373a10.1 10.1 0 0 0-7.07 2.93c-1.86 1.86-2.922 4.441-2.922 7.07s1.063 5.21 2.922 7.07a10.1 10.1 0 0 0 7.07 2.93c2.64 0 5.211-1.07 7.078-2.93 1.864-1.86 2.93-4.441 2.93-7.07s-1.066-5.21-2.93-7.07a10.091 10.091 0 0 0-7.078-2.93zm0 0" />
  </svg>
);

export default SvgComponent;
