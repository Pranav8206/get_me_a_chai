export default function NotFound() {
  return (
    <div style={{
      backgroundColor: '#fff', // white background
      color: '#000',           // black text
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>404 - Page Not Found</h1>
      <p>The user you are looking for does not exist.</p>
    </div>
  )
}