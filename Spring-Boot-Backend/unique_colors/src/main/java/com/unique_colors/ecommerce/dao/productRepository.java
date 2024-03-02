package com.unique_colors.ecommerce.dao;

import com.unique_colors.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface productRepository extends JpaRepository<Product,Long> {
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
}
