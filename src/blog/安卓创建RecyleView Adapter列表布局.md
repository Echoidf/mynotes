---
title: 安卓创建RecyleView Adapter列表布局  
icon: edit
# 分类  
category:
- 安卓
# 标签
tag:
- 安卓
sticky: false
# 排序越大越靠前
star: 35  
# 添加到文章列表
article: true
# 添加到时间线 
timeline: true
---

RecyclerView 是一个容器，它用于显示列表形式 (list) 或者网格形式 (grid) 的数据，比如文本或者照片。

当列表滑动的时候，实际上只有少量邻近的视图会显示在屏幕上。当视图滑出屏幕时，RecyclerView 会复用它并且填充新的数据。由于它是通过回收已有的结构而不是持续创建新的列表项，所以它可以有效提高应用的时间效率和空间效率

本篇文章将展示一个RecyclerView demo，来实践一下如何使用RecyclerView来渲染列表。



## 布局xml文件

activity_action_list.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center"
    tools:context=".DataCollectActivity">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/actionList"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</LinearLayout>
```

action_item.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/card"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center"
    android:layout_gravity="center_horizontal"
    android:orientation="vertical">

    <ImageView
        android:id="@+id/img"
        android:layout_width="150dp"
        android:layout_height="150dp"
        android:src="@drawable/action1" />

    <TextView
        android:id="@+id/title"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:text="action1" />

    <Button
        android:layout_width="120dp"
        android:layout_height="40dp"
        android:backgroundTint="@color/teal_700"
        android:text="开始录制" />
</LinearLayout>
```

注意这里如果需要使子项水平居中，需要使用线性布局`LinearLayout`，并且`android:layout_width="match_parent"`是不可或缺的

## Adapter

```java
package com.wit.example;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.wit.example.bean.ActionBean;

import java.util.List;

public class ActionListAdapter extends RecyclerView.Adapter<ActionListAdapter.MyViewHolder> {

    private List<ActionBean> data;

    public ActionListAdapter(List<ActionBean> data) {
        this.data = data;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.action_item, parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        ActionBean card = data.get(position);
        holder.img.setImageResource(card.getImg());
        holder.title.setText(card.getTitle());
    }

    @Override
    public int getItemCount() {
        return data.size();
    }

    static class MyViewHolder extends RecyclerView.ViewHolder {
        LinearLayout card;
        ImageView img;

        TextView title;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            card = itemView.findViewById(R.id.card);
            img = itemView.findViewById(R.id.img);
            title = itemView.findViewById(R.id.title);
        }
    }
}

```

## 列表项bean

```java
package com.wit.example.bean;

public class ActionBean {
    private Integer img;
    private String title;

    public ActionBean(Integer img, String title) {
        this.img = img;
        this.title = title;
    }

		...get&set
}

```



## Activity

在页面初始化时进行渲染：

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  setContentView(R.layout.activity_data_collect);

  RecyclerView recyclerView = findViewById(R.id.actionList);
  GridLayoutManager layoutManager = new GridLayoutManager(this, 2);
  // 设置纵向滚动
  layoutManager.setOrientation(RecyclerView.VERTICAL);
  recyclerView.setLayoutManager(layoutManager);

  List<ActionBean> ActionBeans = Arrays.asList(
    new ActionBean(R.drawable.action1, "标题1"),
    new ActionBean(R.drawable.action2, "标题2"),
    new ActionBean(R.drawable.action3, "标题3"),
    new ActionBean(R.drawable.action4, "标题4")
  );

  ActionListAdapter adapter = new ActionListAdapter(ActionBeans);
  recyclerView.setAdapter(adapter);
}
```

## 如何展示gif

Adapter：

```java
@Override
public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
  ActionBean card = data.get(position);
  holder.img.setImageResource(card.getImg());
  Drawable drawable = holder.img.getDrawable();
  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
    if(drawable instanceof AnimatedImageDrawable) {
      ((AnimatedImageDrawable) drawable).registerAnimationCallback(new Animatable2.AnimationCallback() {
        @Override
        public void onAnimationStart(Drawable drawable) {
          super.onAnimationStart(drawable);
        }
        @Override
        public void onAnimationEnd(Drawable drawable) {
          super.onAnimationEnd(drawable);
        }
      });

      // ((AnimatedImageDrawable) drawable).setRepeatCount(2);
      ((AnimatedImageDrawable) drawable).start();
    }
  }
  holder.title.setText(card.getTitle());
}
```

