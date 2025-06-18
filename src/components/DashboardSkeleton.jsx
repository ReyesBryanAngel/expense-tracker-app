import { Box, Skeleton, Container } from "@mui/material";

const DashboardSkeleton = () => (
  <Box
    sx={{
      background: "linear-gradient(to bottom right, #eef3fd, #e6eaff)",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Container sx={{ py: 12 }}>
      <Skeleton variant="text" width={220} height={40} />
      <Skeleton variant="rectangular" height={200} sx={{ my: 2 }} />
      <Skeleton variant="rectangular" height={400} />
    </Container>
  </Box>
);

export default DashboardSkeleton;
