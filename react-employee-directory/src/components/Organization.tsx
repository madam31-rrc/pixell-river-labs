import { organizationData } from '../data/organization';

function Organization() {
  return (
    <main className="main">
      <div className="organization-section">
        <h2>Leadership & Management</h2>
        <div className="role-list">
          {organizationData.map((person, index) => (
            <div key={index} className="role-item">
              <div className="person-name">
                {person.firstName} {person.lastName}
              </div>
              <div className="person-role">{person.role}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Organization;