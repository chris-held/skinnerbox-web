import React, { Fragment } from 'react';
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { Build, Done } from '@material-ui/icons';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  right: { ...theme.mixins.right },
  root: {
    padding: 8,
  },
  bordered: {
    borderBottom: `1px solid ${theme.colors.grey.light}`,
  },
  action: {
    marginLeft: 8,
  },
}));

const ActivityList = ({
  title,
  activities,
  onCreate,
  onActivityComplete,
  onActivityEdit,
}) => {
  const styles = useStyles();
  return (
    <Grid container spacing={4} className={styles.root}>
      <Grid spacing={3} item container xs={12} alignItems="center">
        <Grid item>
          <Typography variant="h3">{title}</Typography>
        </Grid>
        <Grid item className={styles.right}>
          <Button
            onClick={onCreate}
            type="button"
            variant="outlined"
            color="primary"
            size="large"
          >
            New
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center" spacing={3}>
        {activities.length ? (
          <Fragment>
            {activities.map(activity => (
              <Grid
                item
                xs={12}
                container
                alignItems="center"
                key={activity.id}
                className={styles.bordered}
              >
                <Grid item xs={8}>
                  <Typography variant="body1">{activity.name}</Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  container
                  alignItems="center"
                  justify="flex-end"
                >
                  <Typography variant="h5">{activity.value}</Typography>
                  <IconButton
                    className={styles.action}
                    onClick={onActivityComplete}
                    type="button"
                    size="medium"
                    color="primary"
                  >
                    <Done />
                  </IconButton>
                  <IconButton
                    size="small"
                    className={styles.action}
                    onClick={onActivityEdit}
                    type="button"
                  >
                    <Build />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Fragment>
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">
              {`No ${title} found. Try creating one!`}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

ActivityList.propTypes = {
  title: PropTypes.string,
  activities: PropTypes.array,
  onCreate: PropTypes.func.isRequired,
  onActivityComplete: PropTypes.func.isRequired,
  onActivityEdit: PropTypes.func.isRequired,
};

ActivityList.defaultProps = {
  title: 'Title',
  activities: [],
};

export default ActivityList;
