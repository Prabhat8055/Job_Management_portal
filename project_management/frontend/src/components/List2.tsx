import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

const List2: React.FC = () => {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "#FFFFFF",
        mt: "30px",
        borderRadius: "12px",
        border: "1px solid #E6EAF2",
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* HEADER */}
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#1F2937",
              }}
            >
              Recent Updates
            </Typography>
          }
        />
      </ListItem>

      <Divider
        variant="inset"
        component="li"
        sx={{
          borderColor: "#E6EAF2",
        }}
      />

      {/* LIST ITEM */}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1F2937",
              }}
            >
              Summer BBQ
            </Typography>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                sx={{
                  color: "text.primary",
                  display: "inline",
                }}
              >
                to Scott, Alex, Jennifer
              </Typography>

              {" — Wish I could come, but I'm out of town this…"}
            </>
          }
        />
      </ListItem>
    </List>
  );
};

export default List2;
