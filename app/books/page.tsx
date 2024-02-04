import { createClient } from "@/utils/supabase/server";
import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { cookies } from "next/headers";
import BookIcon from "@mui/icons-material/Book";
import Image from "next/image";

export default async function Notes() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: books } = await supabase.from("book").select();

  function truncate(str: string, n: number) {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  }

  return (
    <Container>
      {books?.map((book) => (
        <Card
          sx={{
            display: "flex",

            justifyContent: "flex-start",
            mb: 2,
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              m: 1,
              p: 1,
              width: "150px",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              backgroundColor: book.imageUrl
                ? "var(--mui-palette-common-white)"
                : "var(--mui-palette-grey-200)",
            }}
          >
            {book.imageUrl ? (
              <Image
                src={book.imageUrl}
                alt={book.title}
                fill={true}
                objectFit="contain"
              />
            ) : (
              <BookIcon fontSize="large" />
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardHeader
              title={book.title}
              subheader={
                <>
                  <Typography variant="body1" color="text.primary">
                    {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.subtitle}
                  </Typography>
                </>
              }
            />

            <CardContent>
              {book.description && (
                <Stack direction="row">
                  <Typography variant="body2" color="text.secondary">
                    {truncate(book.description, 200)}
                    <Link>Více</Link>
                  </Typography>
                </Stack>
              )}
            </CardContent>
            <CardActions>
              <Box sx={{ textAlign: "right", m: 1, width: "100%" }}>
                Dostupné:{" "}
                {book.quantity -
                  (book.holder !== null ? book.holder.length : 0)}{" "}
                / {book.quantity}
              </Box>
            </CardActions>
          </Box>
        </Card>
      ))}
    </Container>
  );
}
