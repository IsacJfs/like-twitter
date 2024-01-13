// import { useEffect, useState } from "react";

// interface FollowButtonProps {
//   currentUser: string;
//   targetUser: string;
// }

// const FollowButton = ({ currentUser, targetUser }: FollowButtonProps) => {
//   const [isFollowing, setIsFollowing] = useState(false);

//   useEffect(() => {
//     // API call to check if currentUser is following targetUser
//     checkFollowStatus(currentUser, targetUser).then(status => {
//       setIsFollowing(status);
//     });
//   }, [currentUser, targetUser]);

//   const handleFollowClick = async () => {
//     try {
//       if (isFollowing) {
//         // API call to unfollow
//         await unfollowUser(currentUser, targetUser);
//       } else {
//         // API call to follow
//         await followUser(currentUser, targetUser);
//       }
//       setIsFollowing(!isFollowing); // Toggle the state
//     } catch (error) {
//       // Handle error (e.g., show a message)
//     }
//   };

//   return (
//     <button onClick={handleFollowClick}>
//       {isFollowing ? 'Unfollow' : 'Follow'}
//     </button>
//   );
// };

// export default FollowButton

