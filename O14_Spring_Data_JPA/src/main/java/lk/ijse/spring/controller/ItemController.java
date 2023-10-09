package lk.ijse.spring.controller;

import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.service.ItemService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/item")
@CrossOrigin
public class ItemController {

    /*@Autowired
    ItemRepo dao;*/
    @Autowired
    ItemService itemService;

    @PostMapping
    public ResponseUtil saveItem(ItemDTO dto){
        itemService.addItem(dto);
        return new ResponseUtil("Ok","Successfully Added",dto);
    }

    @DeleteMapping
    public ResponseUtil deleteItem(String id){
        itemService.deleteItem(id);
        return new ResponseUtil("Ok","Successfully Deleted",id);
    }

    @GetMapping
    public ResponseUtil getAllItem(){
        return new ResponseUtil("Ok","Successfully Loaded",itemService.getAllItem());
    }

    @GetMapping(params = {"id"})
    public ResponseUtil findItem(String id){
        return new ResponseUtil("Ok","Successfully ", itemService.findItem(id));
    }

    @PutMapping
    public ResponseUtil updateItem(@RequestBody ItemDTO i){
        itemService.updateItem(i);
        return new ResponseUtil("Ok","Successfully Updated",i);
    }

}
