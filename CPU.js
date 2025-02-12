import React, { useState } from 'react';
import { Search, Filter, Plus, SlidersHorizontal } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const PCPartPicker = () => {
    const [selectedPart, setSelectedPart] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        price: 'all',
        brand: 'all',
        cores: 'all',
        socket: 'all',
        tdp: 'all',
        generation: 'all'
    });
    const [showFilters, setShowFilters] = useState(false);

    // Enhanced sample data
    const components = [
        {
            id: 1,
            name: "AMD Ryzen 7 5800X",
            price: 449.99,
            specs: "8 cores, 16 threads, 3.8GHz",
            image: "/api/placeholder/200/200",
            brand: "AMD",
            cores: 8,
            socket: "AM4",
            tdp: 105,
            generation: "Zen 3"
        },
        {
            id: 2,
            name: "Intel Core i9-12900K",
            price: 589.99,
            specs: "16 cores, 24 threads, 3.2GHz",
            image: "/api/placeholder/200/200",
            brand: "Intel",
            cores: 16,
            socket: "LGA 1700",
            tdp: 125,
            generation: "12th Gen"
        },
        {
            id: 3,
            name: "AMD Ryzen 5 5600X",
            price: 299.99,
            specs: "6 cores, 12 threads, 3.7GHz",
            image: "/api/placeholder/200/200",
            brand: "AMD",
            cores: 6,
            socket: "AM4",
            tdp: 65,
            generation: "Zen 3"
        }
    ];

    // Filter options
    const filterOptions = {
        brand: ['all', 'AMD', 'Intel'],
        cores: ['all', '4', '6', '8', '12', '16'],
        socket: ['all', 'AM4', 'LGA 1700', 'LGA 1200'],
        tdp: ['all', 'under65', '65to105', 'over105'],
        generation: ['all', 'Zen 3', '12th Gen', '11th Gen']
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const filteredComponents = components.filter(component => {
        const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = filters.price === 'all' ||
            (filters.price === 'under300' && component.price < 300) ||
            (filters.price === '300to500' && component.price >= 300 && component.price <= 500) ||
            (filters.price === 'over500' && component.price > 500);
        const matchesBrand = filters.brand === 'all' || component.brand === filters.brand;
        const matchesCores = filters.cores === 'all' || component.cores === parseInt(filters.cores);
        const matchesSocket = filters.socket === 'all' || component.socket === filters.socket;
        const matchesTDP = filters.tdp === 'all' ||
            (filters.tdp === 'under65' && component.tdp < 65) ||
            (filters.tdp === '65to105' && component.tdp >= 65 && component.tdp <= 105) ||
            (filters.tdp === 'over105' && component.tdp > 105);
        const matchesGeneration = filters.generation === 'all' || component.generation === filters.generation;

        return matchesSearch && matchesPrice && matchesBrand && matchesCores &&
            matchesSocket && matchesTDP && matchesGeneration;
    });

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Select CPU</h1>
                <p className="text-gray-600">Choose a processor for your build</p>
            </div>

            <div className="mb-6">
                <div className="flex gap-4 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search components..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        Filters
                    </button>
                </div>

                {showFilters && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                            <label className="block text-sm font-medium mb-2">Price Range</label>
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={filters.price}
                                onChange={(e) => handleFilterChange('price', e.target.value)}
                            >
                                <option value="all">All Prices</option>
                                <option value="under300">Under $300</option>
                                <option value="300to500">$300 - $500</option>
                                <option value="over500">Over $500</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Brand</label>
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={filters.brand}
                                onChange={(e) => handleFilterChange('brand', e.target.value)}
                            >
                                {filterOptions.brand.map(option => (
                                    <option key={option} value={option}>
                                        {option === 'all' ? 'All Brands' : option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Cores</label>
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={filters.cores}
                                onChange={(e) => handleFilterChange('cores', e.target.value)}
                            >
                                {filterOptions.cores.map(option => (
                                    <option key={option} value={option}>
                                        {option === 'all' ? 'All Cores' : `${option} Cores`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Socket</label>
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={filters.socket}
                                onChange={(e) => handleFilterChange('socket', e.target.value)}
                            >
                                {filterOptions.socket.map(option => (
                                    <option key={option} value={option}>
                                        {option === 'all' ? 'All Sockets' : option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">TDP</label>
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={filters.tdp}
                                onChange={(e) => handleFilterChange('tdp', e.target.value)}
                            >
                                <option value="all">All TDP</option>
                                <option value="under65">Under 65W</option>
                                <option value="65to105">65W - 105W</option>
                                <option value="over105">Over 105W</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Generation</label>
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={filters.generation}
                                onChange={(e) => handleFilterChange('generation', e.target.value)}
                            >
                                {filterOptions.generation.map(option => (
                                    <option key={option} value={option}>
                                        {option === 'all' ? 'All Generations' : option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredComponents.map((component) => (
                    <Card
                        key={component.id}
                        className="transition-transform duration-200 hover:scale-105 cursor-pointer"
                        onClick={() => setSelectedPart(component)}
                    >
                        <CardHeader>
                            <img
                                src={component.image}
                                alt={component.name}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-xl mb-2">{component.name}</CardTitle>
                            <CardDescription>
                                <div className="space-y-1">
                                    <p>{component.specs}</p>
                                    <p>Socket: {component.socket}</p>
                                    <p>TDP: {component.tdp}W</p>
                                    <p>Generation: {component.generation}</p>
                                </div>
                            </CardDescription>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-bold">${component.price}</span>
                                <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                    <Plus className="w-4 h-4" />
                                    Add to Build
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PCPartPicker;