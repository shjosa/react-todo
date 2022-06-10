import { Task } from '../utils/api';
import { Box, Typography, List, ListItemButton, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoListProps {
    taskList: Array<Task>;
    sectionName: string;
    toggleCompleted: (key: number) => void;
    removeFromArray: (key: number) => void;
}
  
export function TodoList({ taskList, sectionName, toggleCompleted, removeFromArray }: TodoListProps) {
    if (!taskList.length)
        return null;
    return <>
        <Box>
            <Typography variant="h2">{sectionName}</Typography>
            <List>
                {taskList.map((obj, i) =>
                    <ListItem 
                        key={obj.key}
                        secondaryAction={
                            <IconButton edge="end" onClick={() => removeFromArray(obj.key)}>
                                <DeleteIcon/>
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
                            <ListItemText primary={obj.name}/>
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Box>
    </>
}