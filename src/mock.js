let members = [
    {
      id: 1,
      name_en: "John Doe",
      name_jp: "ジョン ドー",
      email: "john.doe@example.com",
      department: "Engineering",
      group: "Frontend",
      other: "Lead developer",
    },
    {
      id: 2,
      name_en: "Jane Smith",
      name_jp: "ジェーン スミス",
      email: "jane.smith@example.com",
      department: "Design",
      group: "UI/UX",
      other: "Senior designer",
    },
  ];
  
  export const fetchMembers = async () => {
    return new Promise((resolve) => setTimeout(() => resolve([...members]), 500));
  };
  
  export const addMember = async (member) => {
    return new Promise((resolve) => {
      const newMember = { ...member, id: Date.now() };
      members.push(newMember);
      setTimeout(() => resolve(newMember), 500);
    });
  };
  
  export const updateMember = async (id, updatedMember) => {
    return new Promise((resolve) => {
      members = members.map((m) => (m.id === id ? updatedMember : m));
      setTimeout(() => resolve(updatedMember), 500);
    });
  };
  
  export const deleteMember = async (id) => {
    return new Promise((resolve) => {
      members = members.filter((m) => m.id !== id);
      setTimeout(() => resolve(), 500);
    });
  };
  