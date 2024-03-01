package com.unique_colors.ecommerce.dao;

import com.unique_colors.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory",path = "product-category")
public interface productCategoryRepository extends JpaRepository<ProductCategory,Long> {
}
