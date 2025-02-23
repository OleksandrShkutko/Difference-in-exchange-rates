import { Typography, Breadcrumbs, Link } from "@mui/material";

export default function BreadcrumbsRow({ breadcrumbs }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb) => {
        return (
          breadcrumb.href ? (
            <Link
              key={breadcrumb.text}
              underline="hover"
              color="inherit"
              href={breadcrumb.href}
              textTransform='capitalize'
              children={breadcrumb.text}
            />
          ) : (
            <Typography
              key={breadcrumb.text}
              color="text.primary"
              textTransform='capitalize'
              children={breadcrumb.text}
            />
          )
        ) 
      })}
    </Breadcrumbs>
  );
}