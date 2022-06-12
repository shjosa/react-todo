import { Task } from '../utils/api';
import { Card, CardHeader, CardContent, Typography, List, ListItemButton, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoListProps {
    taskList: Array<Task>;
    title: string;
    toggleCompleted: (key: number) => void;
    removeFromArray: (key: number) => void;
}

export function TodoListCard({ taskList, title, toggleCompleted, removeFromArray }: TodoListProps) {
    if (!taskList.length)
        return null;
    return (
        <Card variant="outlined">
            <CardHeader title="Active" />
            <CardContent>
                <List sx={{ padding: 0 }}>
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
    )
}