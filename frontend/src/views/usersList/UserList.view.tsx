import Container from "@mui/material/Container";
import MyAppBar from "./AppBar.component";
import MyEnhancedTable from "./Table.component";

export default function UsersListView() {
  return (
    <Container>
      <MyAppBar />
      <MyEnhancedTable />
    </Container>
  );
}
