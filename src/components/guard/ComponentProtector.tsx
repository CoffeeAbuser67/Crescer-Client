import React from 'react';
// import { useUserStore } from './userStore';

// interface GuardProps {
//   allowedRoles: string[];
//   children: React.ReactNode;
// }


// HERE ComponentProtector
// const ComponentProtector: React.FC<GuardProps> = ({ allowedRoles, children }) => {
//   const { role } = useUserStore();

//   if (!allowedRoles.includes(role)) {

//     return <></>;
  
//   }

//   return <>{children}</>;

// };





interface GuardProps {
  children: React.ReactNode;
}

// HERE ComponentProtector
const ComponentProtector: React.FC<GuardProps>  = ({children}) => {
  // const { role } = useUserStore();

  // if (!allowedRoles.includes(role)) {

  //   return <></>;
  
  // }

  // return <>{children}</>;

  return <></>;


};





export default ComponentProtector