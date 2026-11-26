#include <bits/stdc++.h>
using namespace std;

int num_boats(std::vector<int> people, int limit) {
    std::sort(people.begin(), people.end());
    int i = 0, j = (int)people.size() - 1, boats = 0;
    while (i <= j) {
        if (people[i] + people[j] <= limit) i++;
        j--;
        boats++;
    }
    return boats;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> people(n);
    for (int& x : people) cin >> x;
    int limit;
    cin >> limit;
    cout << num_boats(people, limit) << "\n";
    return 0;
}
