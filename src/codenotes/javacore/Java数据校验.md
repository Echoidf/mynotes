---
# 当前页面内容标题
title: Java数据校验
# 当前页面图标
icon: write
# 分类
category:
  - Java
# 标签
tag:
  - Java
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 20
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---





## Maven依赖

```xml
 <dependency>
     <groupId>org.hibernate.validator</groupId>
     <artifactId>hibernate-validator</artifactId>
     <version>6.2.3.Final</version>
</dependency>
```

## 分组校验

当对同一个字段在不同情况下（不同方法）需要有不同的校验规则时，可以使用分组校验。

比如新增商品时禁止携带商品 id，需要使用 `@Null` 注解， 但是修改商品时必须携带商品 id，需要使用 @NotNull注解。

校验注解中一般都有 `groups` 属性：

```java
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RUNTIME)
@Repeatable(List.class)
@Documented
@Constraint(validatedBy = { })
public @interface Null {

	String message() default "{javax.validation.constraints.Null.message}";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
    
	@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
	@Retention(RUNTIME)
	@Documented
	@interface List {

		Null[] value();
	}
}
```

可以设置 id 的校验注解如下：

```java
@Null(message = "添加不能指定id", groups = {SaveGroup.class})
@NotNull(message = "修改需要指定id", groups = {UpdateGroup.class})
@TableId
private Long id;
```

其中 `SaveGroup` 和 `UpdateGroup` 只是两个作为标识的接口

Controller层：

```java
@RestController
public class GoodsController{
    @RequestMapping("/save")
    public Result save(@Validated({SaveGroup.class} @RequestBody Goods good)){
        ...
    }
    @RequestMapping("/update")
    public Result update(@Validated({UpdateGroup.class} @RequestBody Goods good)){
        ...
    }
}
```



## 自定义校验器

在项目中经常会遇到需要对前端传过来的参数进行校验，但是在使用正则表达式校验数值类型的字段时是不会生效的，比如下面这个案例就会报错：

```java
@Pattern(regexp = "/^[0-1]$/", message="显示状态必须为0或1")
private Integer status;
```

这个时候可以使用自定义校验注解：

```java
@EnumValidate(values={0,1}, group={SaveGroup.class, UpdateGroup.class})
private Integer status;
```

注解：

```java
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * @author 左齐亮
 * @version 1.0
 * 自定义校验注解
 * 1. @Constraint(validatedBy = { }) 可以指定该注解和校验器关联
 * 2. message() default "{}" 指定返回的错误信息--ValidationMessages.properties(Unicode格式)
 */
@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE})
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = {EnumConstraintValidator.class})
public @interface EnumValidation {
    String message() default "{com.njupt.valid.EnumValidation.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    int[] values() default {};
}
```

需要注意的是注解的message属性值，这里填入的是 package name.EnumValidation.message，需要在`Resources`目录下建立`ValidationMessages.properties`文件，且需要转成Unicode编码格式：

```properties
com.njupt.valid.EnumValidation.message=\u663E\u793A\u72B6\u6001\u7684\u503C\u5FC5\u987B\u4E3A\u0030\u6216\u8005\u0031
```

校验器：

```java
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.HashSet;
import java.util.Set;

/**
 * @author 左齐亮
 * @version 1.0
 * 自定义校验器
 */
public class EnumConstraintValidator implements ConstraintValidator<EnumValidation, Integer> {

    private Set<Integer> set = new HashSet<>();

    @Override
    public void initialize(EnumValidation constraintAnnotation) {
        // 获取注解传入的values
        int[] values = constraintAnnotation.values();
        for (int value : values) {
            set.add(value);
        }
    }

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        // 参数value是请求携带的参数值
        return set.contains(value);
    }
}
```
