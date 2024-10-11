// import React from 'react'
// import { useSelector } from 'react-redux'

// function ProfilePage() {

//   const user = useSelector(state=>state.users.user)
  
//   return (
//     <div>ProfilePage</div>

//   )
// }

// export default ProfilePage






import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Switch, Space } from 'antd'; // Use Space for layout
import { useSelector } from 'react-redux';

// Define actions for the card
const actions = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];

function ProfilePage() {
  const [loading, setLoading] = useState(true); // No need for boolean in useState
  const user = useSelector(state => state.users.user); // Moved useSelector inside the component

  return (
    <div className="profile-page-container">
      {/* Use Ant Design Space component to add spacing between elements */}
      <Space direction="vertical" size="large" align="center" style={{ width: '100%' }}>
        
        
        {/* Card component */}
        <Card loading={!loading} actions={actions} style={{ minWidth: 300 }}>
          <Card.Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
            title={user?.name || "User Profile"} // Display user name or fallback title
            description={
              <>
                <p>Role : {(user?.isAdmin)?"Admin":"User"}</p>
                <p>Email: {user?.email || "N/A"}</p>
                <p>Password (encrypted) : {user?.password || "N/A"}</p>
              </>
            }
          />
        </Card>
      </Space>
    </div>
  );
}

export default ProfilePage;
