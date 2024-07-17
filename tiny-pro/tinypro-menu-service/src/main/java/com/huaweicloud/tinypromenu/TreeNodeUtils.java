package com.huaweicloud.tinypromenu;
import com.huaweicloud.model.Menu;import java.util.ArrayList;

public class TreeNodeUtils {
    private static TreeNodeData toNode(
            Menu menu
    ){
        return new TreeNodeData(
            menu.getId(),menu.getName(),new TreeNodeData[0], menu.getPath(), menu.getComponent()
        );
    }
    public static TreeNodeData[] covertToTree(
            Menu[] menus,
            Object parentId
    ){
        ArrayList<TreeNodeData> tree = new ArrayList<>();
        for (Menu menu : menus) {
            if (menu.getParentId() == parentId){
                TreeNodeData[] children = covertToTree(menus,menu.getId());
                TreeNodeData node = toNode(menu);
                node.setChildren(children);
                tree.add(node);
            }
        }
        return tree.toArray(new TreeNodeData[0]);
    }

}
