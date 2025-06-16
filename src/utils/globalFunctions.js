export const getInitials = (fullName) => {
    if (!fullName) return '';
    const names = fullName.trim().split(' ').filter(n => n); // remove extra spaces
    const firstInitial = names[0]?.[0] || '';
    const lastInitial = names[names.length - 1]?.[0] || '';
    return (firstInitial + lastInitial).toUpperCase();
};