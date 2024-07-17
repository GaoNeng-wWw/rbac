package com.huaweicloud.tinypromenu;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.swing.tree.TreeNode;

@Data
@Getter
@Setter
public class TreeNodeData {
    public Object id;
    public String label;
    public TreeNodeData[] children;
    public String url;
    public String component;
    public TreeNodeData(Object id, String label, TreeNodeData[] children, String url, String component) {
        this.id = id;
        this.label = label;
        this.children = children;
        this.url = url;
        this.component = component;
    }

}

