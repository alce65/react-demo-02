
// export type Profile = {
//   type: 'admin' | "user";
//   name: string;
//   email?: string; // Solo para usuarios
//   permissions?: string[]; // Solo para administradores
// }

interface AdminProfile {
  type: 'admin';
  name: string;
  permissions: string[];
}

interface UserProfile {
  type: 'user';
  name: string;
  email: string;
}

type Profile = AdminProfile | UserProfile;

// Unión de tipos para la prop
interface ProfileProps {
  profile: Profile
}

export const Sample6Profile: React.FC<ProfileProps> = ({ profile }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Type: {profile.type}</p>
      <p>Name: {profile.name}</p>
      {profile.type === 'user' && <p>Email: {profile.email}</p>}
      {profile.type === 'admin' && (
        <p>Permissions: {profile.permissions.join(', ')}</p>
      )}
    </div>
  );
}
