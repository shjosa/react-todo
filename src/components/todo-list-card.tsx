import { Task } from '../utils/api';
import { Card, CardHeader, CardContent, List, ListItemButton, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoListProps {
    taskList: Array<Task>;
    title: string;
    toggleCompleted: (key: number) => void;
    removeFromArray: (key: number) => void;
    testid: string;
}

export function TodoListCard({ taskList, title, toggleCompleted, removeFromArray, testid }: TodoListProps) {
    if (!taskList.length)
        return null;
    return (
        <Grid item xs={6}>
            <Card variant="outlined">
                <CardHeader title={title} />
                <CardContent>
                    <List sx={{ padding: 0 }} data-testid={testid}>
                        {taskList.map((obj, i) =>
                            <ListItem
                                sx={{ padding: 0 }}
                                key={obj.key}
                                secondaryAction={
                                    <IconButton edge="end" onClick={() => removeFromArray(obj.key)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemButton onClick={() => toggleCompleted(obj.key)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={obj.isCompleted}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={obj.name} />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </CardContent>
            </Card>
        </Grid>
    )
}