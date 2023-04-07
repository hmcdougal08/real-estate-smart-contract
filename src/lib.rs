use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    collections::UnorderedMap,
    near_bindgen,
    serde::{Deserialize, Serialize},
};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct RealEstate {
    properties: UnorderedMap<String, Property>,
}

impl Default for RealEstate {
    fn default() -> Self {
        Self {
            properties: UnorderedMap::new(b"properties".to_vec()),
        }
    }
}

#[near_bindgen]
impl RealEstate {
    pub fn add_property(&mut self, id: String, address: String, price: u64) {
        let property = Property {
            id: id.clone(),
            address,
            price,
        };

        self.properties.insert(&id, &property);
    }

    pub fn get_property(&self, id: String) -> Option<Property> {
        self.properties.get(&id)
    }
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone, Debug, PartialEq, Eq)]
pub struct Property {
    id: String,
    address: String,
    price: u64,
}

