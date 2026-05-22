import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import AllInboxIcon from "@mui/icons-material/AllInbox";
import SendIcon from "@mui/icons-material/Send";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CancelIcon from "@mui/icons-material/Cancel";

import type { ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface DashboardStats {
  total?: number;
  applied?: number;
  interviewing?: number;
  offers?: number;
  rejected?: number;
  [key: string]: number | undefined;
}

interface Box1Props {
  stats: DashboardStats;
}

interface CardItem {
  id: number;
  title: string;
  key: keyof DashboardStats;
  icon: ReactNode;
  color: string;
}

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const cards: CardItem[] = [
  {
    id: 1,
    title: "Total Applications",
    key: "total",
    icon: <AllInboxIcon />,
    color: "#1976D2",
  },
  {
    id: 2,
    title: "Applied",
    key: "applied",
    icon: <SendIcon />,
    color: "#0288D1",
  },
  {
    id: 3,
    title: "Interviewing",
    key: "interviewing",
    icon: <EventAvailableIcon />,
    color: "#ED6C02",
  },
  {
    id: 4,
    title: "Offers",
    key: "offers",
    icon: <EmojiEventsIcon />,
    color: "#2E7D32",
  },
  {
    id: 5,
    title: "Rejected",
    key: "rejected",
    icon: <CancelIcon />,
    color: "#D32F2F",
  },
];

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

const Box1: React.FC<Box1Props> = ({ stats }) => {
  const [selectedCard, setSelectedCard] = React.useState<number>(0);

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          sx={{
            fontFamily: "Inter, sans-serif",
            borderRadius: 2,
          }}
        >
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? "" : undefined}
            sx={{
              height: "100%",

              "&[data-active]": {
                backgroundColor: "action.selected",

                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },

              boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 15px",

              transition: "all 0.2s ease",

              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            <CardContent>
              {/* HEADER */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {/* ICON */}
                <Box
                  sx={{
                    color: card.color,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {card.icon}
                </Box>

                {/* TITLE */}
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#374151",
                  }}
                >
                  {card.title}
                </Typography>
              </Box>

              {/* VALUE */}
              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "#1F2937",
                  lineHeight: 1.2,
                  mt: 1,
                }}
              >
                {stats[card.key] ?? 0}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default Box1;
