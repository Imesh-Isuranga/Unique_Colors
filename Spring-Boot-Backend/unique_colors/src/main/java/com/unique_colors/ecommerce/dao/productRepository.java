package com.unique_colors.ecommerce.dao;

import com.unique_colors.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface productRepository extends JpaRepository<Product,Long> {
}
